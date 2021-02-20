import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Modal, { ModalHandler } from '~/components/Modal';

type setContentArgs = {
  id: string;
  content: Element;
  title: string;
  confirm: string;
};

type ContextProps = {
  setContent: (args: setContentArgs) => void;
};

const ModalContext = createContext<ContextProps>({
  setContent: () => null,
});

export const ModalProvider: React.FC = ({ children }) => {
  const [content, setContent] = useState<Element | null>(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [confirm, setConfirm] = useState('');

  const modalRef = useRef<ModalHandler>(null);

  const onSetContent = (args: setContentArgs) => {
    if (args.id === id) {
      modalRef.current?.show();
      return;
    }

    setId(args.id);
    setTitle(args.title);
    setConfirm(args.confirm);
    setContent(args.content);
  };

  return (
    <ModalContext.Provider value={{ setContent: onSetContent }}>
      {children}
      <Modal
        ref={modalRef}
        onContinue={() => {}}
        id={id}
        title={title}
        confirm={confirm}>
        {content && content}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
