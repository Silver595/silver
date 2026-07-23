import { QuickActionType } from "@/constants";

// Plain card — no video, no glass background. Sized as a wide panel for the
// horizontal-scroll row.
function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group flex h-[440px] w-[78vw] shrink-0 cursor-pointer flex-col justify-between rounded-2xl border p-8 transition-colors hover:border-foreground/40 hover:bg-foreground/[0.03] sm:w-[42vw] lg:w-[28vw]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-foreground/5 transition-transform group-hover:scale-105">
        <action.icon className="h-7 w-7 text-foreground" />
      </div>

      <div>
        <h3 className="font-display text-3xl font-semibold tracking-tight">{action.title}</h3>
        <p className="mt-3 text-muted-foreground">{action.description}</p>
      </div>
    </div>
  );
}

export default ActionCard;
