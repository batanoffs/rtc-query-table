import { HookAPI } from 'antd/es/modal/useModal';
import { createContext } from 'react';

export const ModalContext = createContext<HookAPI>({} as HookAPI);
