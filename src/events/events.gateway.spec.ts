import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';

describe('EventsGateway', () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsGateway],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('get stat', () => {
    it('should be empty', () => {
      expect(gateway.stat({})).toBeDefined();
    });
  });

  describe('set click', () => {
    it('test 2 clicks with 1 orange and 1 blue', () => {
      gateway.reset();
      gateway.click({ sid: 'TEST1', value: 'ORANGE' });
      gateway.click({ sid: 'TEST1', value: 'BLUE' });
      expect(gateway.stat({})).toEqual({ TEST1: { ORANGE: 1, BLUE: 1 } });
    });

    it('test another client with 1 orange and 1 blue', () => {
      gateway.reset();
      gateway.click({ sid: 'TEST1', value: 'ORANGE' });
      gateway.click({ sid: 'TEST1', value: 'BLUE' });
      gateway.click({ sid: 'TEST2', value: 'ORANGE' });
      gateway.click({ sid: 'TEST2', value: 'BLUE' });
      expect(gateway.stat({})).toEqual({
        TEST1: { ORANGE: 1, BLUE: 1 },
        TEST2: { ORANGE: 1, BLUE: 1 },
      });
    });
  });
});
