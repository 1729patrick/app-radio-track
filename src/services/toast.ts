import { showMessage } from 'react-native-flash-message';
import StyleGuide from '~/utils/StyleGuide';

type AlertParams = {
  message: string;
};

class Toast {
  error = ({ message }: AlertParams) => {
    showMessage({
      message,
      type: 'danger',
      color: '#fff',
      style: { paddingTop: 35 },
      textStyle: { ...StyleGuide.typography.caption },
      duration: 3500,
    });
  };

  success = ({ message }: AlertParams) => {
    showMessage({
      message,
      type: 'success',
      color: '#fff',
      style: { paddingTop: 35 },
      textStyle: { ...StyleGuide.typography.caption },
      duration: 3500,
    });
  };

  info = ({ message }: AlertParams) => {
    showMessage({
      message,
      type: 'info',
      color: '#fff',
      style: { paddingTop: 35 },
      textStyle: { ...StyleGuide.typography.caption },
      duration: 3500,
    });
  };
}

export default new Toast();
