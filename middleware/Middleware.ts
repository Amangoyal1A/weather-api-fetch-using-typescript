import { Request, Response, NextFunction } from 'express';

class Middleware {
  isPrime(req: Request, res: Response, next: NextFunction) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    const isPrime = (num: number): boolean => {
      if (num < 2) return false;
      for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
      }
      return true;
    };

    if (!isPrime(currentDay)) {
      console.log('Date is not prime so no data');
      res.status(400).send('Date is not prime so no data');
      res.end();
      return;
    }
    console.log('prime');
    next();
  }
}

export default new Middleware();
