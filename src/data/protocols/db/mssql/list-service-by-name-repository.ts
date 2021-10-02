export interface ListServiceByNameRepository {
  findName(name: string): ListServiceByNameRepository.Result;
}

export namespace ListServiceByNameRepository {
  export type Result = Promise<{
    serviceId: number;
    name: string;
    createdAt: string;
  }>;
}
