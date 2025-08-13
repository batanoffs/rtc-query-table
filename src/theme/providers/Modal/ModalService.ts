import { HookAPI } from 'antd/es/modal/useModal';

class ModalService {
  private static instance: ModalService;
  private modalApi: HookAPI | null = null;

  private constructor() {}

  static getInstance(): ModalService {
    if (!ModalService.instance) {
      ModalService.instance = new ModalService();
    }
    return ModalService.instance;
  }

  setModalApi(api: HookAPI) {
    this.modalApi = api;
  }

  confirm(config: Parameters<HookAPI['confirm']>[0]) {
    if (this.modalApi) {
      return this.modalApi.confirm(config);
    }
  }

  info(config: Parameters<HookAPI['info']>[0]) {
    if (this.modalApi) {
      return this.modalApi.info(config);
    }
  }

  success(config: Parameters<HookAPI['success']>[0]) {
    if (this.modalApi) {
      return this.modalApi.success(config);
    }
  }

  error(config: Parameters<HookAPI['error']>[0]) {
    if (this.modalApi) {
      return this.modalApi.error(config);
    }
  }

  warning(config: Parameters<HookAPI['warning']>[0]) {
    if (this.modalApi) {
      return this.modalApi.warning(config);
    }
  }
}

export default ModalService.getInstance();
