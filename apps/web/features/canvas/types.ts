/**
 * All shared canvas domain types.
 */

export interface Point {
  x: number;
  y: number;
}

export type ToolType =
  'select' | 'hand' | 'rectangle' | 'ellipse' | 'line' | 'arrow' | 'pencil' | 'text' | 'eraser';

export type DrawableTool = Exclude<ToolType, 'select' | 'hand' | 'eraser'>;

export interface ElementStyle {
  stroke: string;
  fill: string;
  strokeWidth: number;
}

interface BaseElement extends ElementStyle {
  id: string;
}

export interface ShapeElement extends BaseElement {
  type: 'rectangle' | 'ellipse';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LinearElement extends BaseElement {
  type: 'line' | 'arrow';
  start: Point;
  end: Point;
}

export interface PencilElement extends BaseElement {
  type: 'pencil';
  points: Point[];
}

export interface TextElement extends BaseElement {
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fontFamily: string;
}

/** Anything that can live on the canvas. */
export type CanvasElement = ShapeElement | LinearElement | PencilElement | TextElement;

export interface Viewport {
  offsetX: number;
  offsetY: number;
  zoom: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ResizeHandle = 'tl' | 'tr' | 'bl' | 'br';
