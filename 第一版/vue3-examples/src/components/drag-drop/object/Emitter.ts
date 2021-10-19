/*
 * @Author: Lvhz
 * @Date: 2021-10-15 09:44:42
 * @Description: 发布订阅
 */

import { Observable, Subscriber } from 'rxjs'

export class Emiter<Topic extends number> {
  // 实例初始化后这里是一个数组；数组内部有多个对象（数组）；每个对象上可以订阅多个事件
  observers : Array<Array<Subscriber<any>>>

  constructor() {
    // 不会超过20个枚举
    this.observers = new Array(50)
  }

  addObserver(topic : Topic, observer : Subscriber<any>) {
    if(!this.observers[topic]) {
      this.observers[topic] = []
    }
    const list = this.observers[topic]
    list.push(observer)
  }

  removeObserver(topic : Topic, observer : Subscriber<any>) {
    const list = this.observers[topic]
    if(list && list.length > 0) {
      this.observers[topic] = list.filter(x => x !== observer)
    }
  }

  on(topic : Topic | Topic[]) : Observable<any> {
    return new Observable<any>(observer => {
      const addedObservers : Array<[Topic, Subscriber<any>]> = []
      if(Array.isArray(topic)) {
        topic.forEach(t => {
          this.addObserver(t, observer)
          addedObservers.push([t, observer]);
        })
      } else {
        this.addObserver(topic, observer)
        addedObservers.push([topic, observer]);
      }

      return {
        unsubscribe: () => {
          addedObservers.forEach(
            x => this.removeObserver(x[0], x[1])
          )
        }
      }
    })
  }

  emit(topic : Topic, data? : any) : void {
    if(this.observers[topic]) {
      this.observers[topic].forEach(observer => {
        observer.next(data)
      })
    }
  }
}

