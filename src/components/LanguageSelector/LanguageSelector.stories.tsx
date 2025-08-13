import { Meta, StoryObj } from "@storybook/react";
import LanguageSelector from "./LanguageSelector";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

const meta: Meta<typeof LanguageSelector> = {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LanguageSelector>;

export const Default: Story = {};

export const DropdownOpen: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    if (button) button.click();
  },
};

export const SpanishSelected: Story = {
  decorators: [
    (Story) => {
      i18n.changeLanguage("es");
      return <Story />;
    },
  ],
};