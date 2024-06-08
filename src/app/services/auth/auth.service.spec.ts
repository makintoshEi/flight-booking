import { BehaviorSubject } from 'rxjs';
import {
  AuthService as AuthEventService,
  IdentityEvent,
  WebviewEvents,
} from '@pichincha/channels-event-bus';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let layoutService: any = {
    updateCurrentWidth: jest.fn(),
  };
  let transferService: any = {
  };

  const { IDENTITY_APP_EVENT } = WebviewEvents;

  beforeEach(() => {
    service = new AuthService(layoutService, transferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Setup service', () => {
    it('should validCredentials be false when service is created', () => {
      service.validCredentials.subscribe((value) => {
        expect(value).toBe(false);
      });
    });
    it('should have a valid baseUrl when service is created', () => {
      expect(service.baseUrl).toContain(environment.apiUrl);
    });

    it('should not be authenticated when service is created', () => {
      expect(service.isAuthenticated).toBeFalsy();
    });
  });

  describe('getToken', () => {
    it('should set clientId and clientIdType when IDENTITY_APP_EVENT event is dispatch in the document', () => {
      const detail: IdentityEvent = {
        clientId: '0103145033',
        clientIdType: '0001',
        device: 'ac56c14d3a48',
        guid: '1c1015438b8f66',
        session: '7f640fb8-6a61-4975-869f-7ecec864ce94',
        ip: '157.100.93.000',
        jwtToken: 'eyJ0eIjoxNjUwMzg4MTAxLCJqdGkiOiJmNmUwY2',
        cif: '1212',
        bban: '2204041234',
      };
      service.getToken();
      document.dispatchEvent(new CustomEvent(IDENTITY_APP_EVENT, { detail }));
      expect(service.authWebviewEvent.clientId).toBe(detail.clientId);
      expect(service.authWebviewEvent.clientIdType).toBe(detail.clientIdType);
    });

    it('should set validCredentials to false clientId and clientIdType are not valid', () => {
      const clientId = undefined;
      const clientIdType = undefined;
      service.getToken();
      document.dispatchEvent(
        new CustomEvent(IDENTITY_APP_EVENT, {
          detail: { clientId, clientIdType },
        })
      );
      service.validCredentials.subscribe((value) => {
        expect(value).toBe(false);
      });
    });

    it('should set validCredentials to true clientId and clientIdType are valid', () => {
      const clientId = '0105332639';
      const clientIdType = '0001';
      service.getToken();
      document.dispatchEvent(
        new CustomEvent(IDENTITY_APP_EVENT, {
          detail: { clientId, clientIdType },
        })
      );
      service.validCredentials.subscribe((value) => {
        expect(value).toBe(true);
        expect(service.isAuthenticated).toBeTruthy();
      });
    });

    it('should call validateSesionEvent with correct detail when event is dispatched', () => {
      const spy = jest.spyOn(service, 'validateSesionEvent');
      const detail: IdentityEvent = {
        clientId: '0103145033',
        clientIdType: '0001',
        device: 'aa975b813d47c269',
        guid: 'd115f320f98a43e19cc4a8375df86ae8',
        session: '5155647c-8fa7-4483-9a57-1deae360882c',
        ip: '157.100.93.233',
        jwtToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sInByb2QiOiJwcml2YXRlLkROSSIsImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiQ2VkdWxhIjoiMDEwMzE0NTAzMyIsImV4cCI6MTY1NTI0MTE1MSwiaWF0IjoxNjU1MjQwNTUxLCJqdGkiOiJlNzg3MWFkYS04ZjdmLTQwMzgtYTg1OC1kODdkMzc1NDA3NmYifQ.ek4HTqBvY6j6R7BNEVpEk9FRtAIepJ5U0xjqjXVPhpw',
        cif: '2399',
        channel: 'web',
        xsrf: '1234-234-1234',
        hash: '6c367955516c37756b4f394b682f75754f586c71384343496b657144326d4944746662437a427a5a3633383d',
        bban: '2204041234',
      };
      service.getToken();
      document.dispatchEvent(
        new CustomEvent(WebviewEvents.IDENTITY_APP_EVENT, { detail })
      );
      expect(spy).toHaveBeenCalledWith(detail);
    });
  });

  it('should call validateSesionEvent with correct detail when event is dispatched and cif is empty', () => {
    const spy = jest.spyOn(service, 'isValidAuthEvent');
    const detail: any = {
      clientId: '0103145033',
      clientIdType: '0001',
      device: 'aa975b813d47c269',
      guid: 'd115f320f98a43e19cc4a8375df86ae8',
      session: '5155647c-8fa7-4483-9a57-1deae360882c',
      ip: '157.100.93.233',
      jwtToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sInByb2QiOiJwcml2YXRlLkROSSIsImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiQ2VkdWxhIjoiMDEwMzE0NTAzMyIsImV4cCI6MTY1NTI0MTE1MSwiaWF0IjoxNjU1MjQwNTUxLCJqdGkiOiJlNzg3MWFkYS04ZjdmLTQwMzgtYTg1OC1kODdkMzc1NDA3NmYifQ.ek4HTqBvY6j6R7BNEVpEk9FRtAIepJ5U0xjqjXVPhpw',
      channel: 'movil',
      xsrf: '1234-234-1234',
      hash: '6c367955516c37756b4f394b682f75754f586c71384343496b657144326d4944746662437a427a5a3633383d',
      bban: '2204041234',
    };
    service.validateSesionEvent(detail);
    expect(spy).toHaveBeenCalledWith(detail);
  });

  it('should return the current channel value', () => {
    const channel = 'MOBILE';
    service['_channel'] = new BehaviorSubject<string>(channel);

    const result = service.getChannel();

    expect(result).toBe(channel);
  });

  it('should return correct channel value', () => {
    service['_channel'].next('someChannel');
    expect(service.channel).toBe('someChannel');
  });

  it('should return true for mobile channel or small screen width', () => {
    service['_channel'] = new BehaviorSubject<string>('MOBILE');
    Object.defineProperty(window, 'screen', { value: { width: 320 } });

    const result = service.useMobileDesign();
    expect(result).toBe(true);
  });

  it('should call AuthEventService.removeInitEvents when removeSubscription is called', () => {
    const spy = jest.spyOn(AuthEventService, 'removeInitEvents');
    service.removeSubscription();
    expect(spy).toHaveBeenCalled();
  });
});
