import * as jobs from '../listeners';
import { ListenerConsume } from '../protocols/listener-consume';

export default (listener: ListenerConsume) => {
  Object.values(jobs)
    .filter((value) => value.enable)
    .map((value) => listener.consume(value.queue, value.handle));
};
