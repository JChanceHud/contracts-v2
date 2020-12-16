export const getEthTime = async (provider: any): Promise<number> => {
  return (await provider.getBlock('latest')).timestamp
}

export const setEthTime = async (
  provider: any,
  time: number
): Promise<void> => {
  await provider.send('evm_setNextBlockTimestamp', [time])
}

export const increaseEthTime = async (
  provider: any,
  amount: number
): Promise<void> => {
  await setEthTime(provider, (await getEthTime(provider)) + amount)
  await provider.send('evm_mine', [])
}

export const getBlockTime = async (
  provider: any,
  block?: number
): Promise<number> => {
  await provider.send('evm_mine', [])
  if (!!block) {
    block = await getNextBlockNumber(provider)
  }
  return (await provider.getBlock(block)).timestamp
}

export const getNextBlockNumber = async (provider: any): Promise<number> => {
  return (await provider.getBlock('latest')).number + 1
}
