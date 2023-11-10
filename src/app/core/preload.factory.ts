import { ConfigService } from "./config.service";

export function PreloadFactory(configService: ConfigService) {
  return () => configService.initialize();
}
