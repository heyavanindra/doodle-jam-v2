export type Point = {
  x: number;
  y: number;
};

const CANVAS_EVENT_TYPE = {
  LINE: 'line',
  CLEAR: 'clear',
  UNDO: 'undo',
  REDO: 'redo',
  COLOR_CHANGE: 'colorChange',
  SIZE_CHANGE: 'sizeChange',
  THICKNESS_CHANGE: 'thicknessChange',
} as const;

type CanvasEventType = (typeof CANVAS_EVENT_TYPE)[keyof typeof CANVAS_EVENT_TYPE];

export type CanvasMessage = {
  type: CanvasEventType;
  payload: JSON;
};
