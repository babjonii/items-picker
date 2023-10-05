declare module 'items-picker' {
  import { ReactNode } from 'react';

  interface ItemsPickerProps {
    isVisible: boolean;
    closeModal: () => void;
    itemsArray: { name: string }[];
    onSelect: (item: { name: string }) => void;
    active: string;
    title: string;
  }

  const ItemsPicker: (props: ItemsPickerProps) => ReactNode;
  export default ItemsPicker;
}
