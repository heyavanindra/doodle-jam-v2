import { createElement, type ReactElement } from 'react';
import { render, pretty } from 'react-email';
import VerifyEmail, { type VerifyEmailProps } from '../emails/verifyEmail.js';

export interface RenderEmailOptions {
  pretty?: boolean;
}

export const renderReactToHtml = async (
  component: ReactElement,
  options?: RenderEmailOptions,
): Promise<string> => {
  return await render(component, {
    pretty: options?.pretty ?? true,
  });
};

export const renderReactToPlainText = async (component: ReactElement): Promise<string> => {
  return await render(component, {
    plainText: true,
  });
};

export const renderVerifyEmailHtml = async (
  props: VerifyEmailProps,
  options?: RenderEmailOptions,
): Promise<string> => {
  return await renderReactToHtml(createElement(VerifyEmail, props), options);
};

export const renderVerifyEmailPlainText = async (
  props: VerifyEmailProps,
): Promise<string> => {
  return await renderReactToPlainText(createElement(VerifyEmail, props));
};

export { render, pretty, VerifyEmail, type VerifyEmailProps };
