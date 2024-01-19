import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

export const statuses = [
  {
    value: true,
    label: "Paid",
    icon: CheckCircledIcon,
  },
  {
    value: false,
    label: "Not Paid",
    icon: CrossCircledIcon,
  },
];

export const paymentMethods = [
  {
    value: "CASH",
    label: "Cash",
  },
  {
    value: "CARD",
    label: "Card",
  },
  {
    value: "TRANSFER",
    label: "Transfer",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

export const categories = [
  {
    value: "FOOD",
    label: "Food",
  },
  {
    value: "TRANSPORT",
    label: "Transport",
  },
  {
    value: "ENTERTAINMENT",
    label: "Entertainment",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];
