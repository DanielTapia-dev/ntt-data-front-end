import { TestBed } from '@angular/core/testing';
import { AlertService, AlertMessage } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let receivedMessage: AlertMessage | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);

    service.alert$.subscribe((msg) => (receivedMessage = msg));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a success message', () => {
    service.success('Success test');
    expect(receivedMessage).toEqual({ type: 'success', text: 'Success test' });
  });

  it('should emit an error message', () => {
    service.error('Error test');
    expect(receivedMessage).toEqual({ type: 'error', text: 'Error test' });
  });

  it('should emit an info message', () => {
    service.info('Info test');
    expect(receivedMessage).toEqual({ type: 'info', text: 'Info test' });
  });

  it('should emit a warning message', () => {
    service.warning('Warning test');
    expect(receivedMessage).toEqual({ type: 'warning', text: 'Warning test' });
  });

  it('should emit a custom alert via show()', () => {
    service.show('success', 'Manual show');
    expect(receivedMessage).toEqual({ type: 'success', text: 'Manual show' });
  });
});
