import { useNavigate } from "solid-start";
import { Button } from "~/components";

export default function WinPage() {
  const navigate = useNavigate();

  return (
    <div class="flex h-full w-full flex-col items-center justify-center">
      <h1>You Won</h1>
      <nav class="mt-8 flex flex-col items-center gap-2">
        <Button class="w-80" onClick={() => navigate("/game")}>
          Start new Game
        </Button>
        <Button class="w-80" onClick={() => navigate("/")}>
          Back to Menu
        </Button>
      </nav>
    </div>
  );
}
