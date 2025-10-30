import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircleIcon, BookIcon, LightbulbIcon, Loader2 } from "lucide-react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Button } from "./ui/button";

// Judge0 API Configuration
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = "3fde7a26e3msha2fb2fa1d4869d6p15973djsnbdd723d1c956";

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
};

const HEADERS = {
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  "X-RapidAPI-Key": JUDGE0_API_KEY,
  "Content-Type": "application/json",
};

// Helper functions for base64 encoding/decoding
const encodeBase64 = (str: string) => {
  if (typeof window !== 'undefined') return btoa(str);
  return Buffer.from(str).toString('base64');
};

const decodeBase64 = (str: string) => {
  if (typeof window !== 'undefined') return atob(str);
  return Buffer.from(str, 'base64').toString();
};

function CodeEditor() {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<"javascript" | "python" | "java">(LANGUAGES[0].id);
  const [code, setCode] = useState(selectedQuestion.starterCode[language]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState("");

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    setCode(question.starterCode[language]);
  };

  const handleLanguageChange = (newLanguage: "javascript" | "python" | "java") => {
    setLanguage(newLanguage);
    setCode(selectedQuestion.starterCode[newLanguage]);
  };

  const compileAndRun = async () => {
    setIsCompiling(true);
    setOutput("Starting code execution...\n");

    try {
      let sourceCode = code;
      if (language === 'javascript') {
        // Wrap console.log so Judge0 captures output
        sourceCode = `const console = { log: (...args) => print(...args) };\n${code}`;
      }

      setOutput(prev => prev + "\nSubmitting code to Judge0...");

      const submissionData = {
        language_id: LANGUAGE_IDS[language],
        source_code: encodeBase64(sourceCode),
        stdin: encodeBase64("") ,
        expected_output: null,
        cpu_time_limit: 5,
        memory_limit: 512000,
      };

      const submitResponse = await axios.post(
        `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=false&fields=*`,
        submissionData,
        { headers: HEADERS }
      );

      const submissionToken = submitResponse.data.token;
      setOutput(prev => prev + `\nSubmission created with token: ${submissionToken}`);

      // Poll for results
      let maxRetries = 20;
      let retryCount = 0;

      while (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          const resultResponse = await axios.get(
            `${JUDGE0_API_URL}/submissions/${submissionToken}?base64_encoded=true&fields=*`,
            { headers: HEADERS }
          );

          const { status, stdout, stderr, compile_output, message, time, memory } = resultResponse.data;

          const decodedStdout = stdout ? decodeBase64(stdout) : "";
          const decodedStderr = stderr ? decodeBase64(stderr) : "";
          const decodedCompileOutput = compile_output ? decodeBase64(compile_output) : "";

          let outputMessage = `\nStatus: ${status?.description || 'Unknown'}`;
          if (time) outputMessage += `\nExecution time: ${time}s`;
          if (memory) outputMessage += `\nMemory used: ${Math.round(memory / 1024)} MB`;

          if (status?.id <= 2) {
            setOutput(prev => prev + "\nStill processing...");
            retryCount++;
            continue;
          }

          if (decodedStdout) outputMessage += "\n\nOutput:\n" + decodedStdout;
          if (decodedStderr) outputMessage += "\n\nErrors:\n" + decodedStderr;
          if (decodedCompileOutput) outputMessage += "\n\nCompilation Output:\n" + decodedCompileOutput;
          if (message) outputMessage += "\n\nMessage:\n" + message;

          setOutput(prev => prev + outputMessage);
          break;

        } catch (pollError) {
          console.error('Poll error:', pollError);
          retryCount++;
        }
      }

      if (retryCount >= maxRetries) {
        setOutput(prev => prev + "\nTimeout: Failed to get results after maximum retries");
      }

    } catch (error: any) {
      console.error('Full error:', error);
      setOutput(prev => prev + "\n\n❌ Error executing code:\n" + JSON.stringify({ message: error.message, response: error.response?.data, status: error.response?.status }, null, 2));
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <ResizablePanelGroup direction="vertical" className="min-h-[calc(100vh-4rem-1px)]">
      {/* QUESTION SECTION */}
      <ResizablePanel>
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">{selectedQuestion.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">Choose your language and solve the problem</p>
                </div>
                <div className="flex items-center gap-3">
                  <Select value={selectedQuestion.id} onValueChange={handleQuestionChange}>
                    <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select question" /></SelectTrigger>
                    <SelectContent>
                      {CODING_QUESTIONS.map((q) => (
                        <SelectItem key={q.id} value={q.id}>{q.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <img src={`/${language}.png`} alt={language} className="w-5 h-5 object-contain" />
                          {LANGUAGES.find((l) => l.id === language)?.name}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          <div className="flex items-center gap-2">
                            <img src={`/${lang.id}.png`} alt={lang.name} className="w-5 h-5 object-contain" />
                            {lang.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* PROBLEM DESC. */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <BookIcon className="h-5 w-5 text-primary/80" />
                  <CardTitle>Problem Description</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">{selectedQuestion.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* EXAMPLES & CONSTRAINTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                    <CardTitle>Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedQuestion.examples.map((example, index) => (
                        <div key={index} className="space-y-2">
                          <p className="font-medium text-sm">Example {index + 1}:</p>
                          <div className="bg-muted/50 p-3 rounded-lg text-sm font-mono">
                            <div>Input: {example.input}</div>
                            <div>Output: {example.output}</div>
                            {example.explanation && <div className="pt-2 text-muted-foreground">Explanation: {example.explanation}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {selectedQuestion.constraints && (
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                      <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                      <CardTitle>Constraints</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground">
                        {selectedQuestion.constraints.map((c, i) => (
                          <li key={i} className="text-muted-foreground">{c}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* CODE EDITOR + RUN */}
      <ResizablePanel defaultSize={60} maxSize={100}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-2 border-b bg-zinc-950">
            <div className="flex items-center gap-4">
              <Button variant="default" onClick={compileAndRun} disabled={isCompiling} className="flex items-center gap-2">
                {isCompiling && <Loader2 className="h-4 w-4 animate-spin" />}
                {isCompiling ? "Running..." : "Run Code"}
              </Button>
              {isCompiling && <span className="text-xs text-zinc-400">Compiling and executing your code...</span>}
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage={language}
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 18,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                wordWrap: "on",
                wrappingIndent: "indent",
              }}
            />
          </div>

          {/* Output Console */}
          <div className="h-48 border-t bg-zinc-900 text-white font-mono text-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-950">
              <span className="text-xs text-zinc-400">Console Output</span>
              <Button variant="ghost" size="sm" onClick={() => setOutput("")} className="h-7 text-xs text-zinc-400 hover:text-white">Clear</Button>
            </div>
            <ScrollArea className="h-[calc(100%-36px)]">
              <div className="p-4">
                {output ? (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="text-zinc-500 text-sm">Click "Run Code" to see the output here</div>
                )}
              </div>
              <ScrollBar />
            </ScrollArea>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default CodeEditor;
