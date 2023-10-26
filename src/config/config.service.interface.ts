export interface IConfigService {
  get: <T>(key: string) => T;
}