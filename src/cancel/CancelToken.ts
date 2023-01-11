import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    // 这是一个处于Pending状态的Promise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve as ResolvePromise
    })

    executor(message => {
      if (this.reason) return

      this.reason = new Cancel(message)
      // 调用以下函数将pending状态的Promise变成resolved状态
      resolvePromise(this.reason)
    })

  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
