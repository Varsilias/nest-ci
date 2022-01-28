/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // describe('say name of user', () => {
  //   it('should say hello to name', () => {
  //     expect(appController.sayHelloToUser('Daniel')).toBe('Hello Human Your name is Daniel');
  //   })
  // })

  // describe('get User Object', () => {
  //   it('should return an object with user details', () => {
  //     expect(appController.getObject('Daniel')).toBe('Daniel');
  //   })
  // })
});
