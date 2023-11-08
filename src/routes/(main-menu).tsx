import { useNavigate } from "solid-start";
import { Button } from "~/components/button";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <main class="flex h-full w-full flex-col items-center justify-center">
      <h1 class="text-4xl lg:text-6xl">Number Match</h1>
      <nav class="mt-8 flex flex-col items-center gap-2">
        <Button class="w-80" onClick={() => navigate("/game")}>
          New Game
        </Button>
      </nav>
    </main>
  );
}
