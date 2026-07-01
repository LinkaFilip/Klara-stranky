export class Fullpage {
  constructor(
    container: string | HTMLElement,
    options?: {
      sections?: string;
      scrollingSpeed?: number;
      navigation?: boolean;
      anchors?: string[];
      onLeave?: (origin: number, destination: number, direction: 'up' | 'down') => void;
      afterLoad?: (
        origin: number | null,
        destination: number,
        direction: 'up' | 'down' | 'none',
      ) => void;
    },
  );

  moveTo(index: number): void;
  moveSectionUp(): void;
  moveSectionDown(): void;
  setAllowScrolling(allow: boolean): void;
  destroy(): void;
}
