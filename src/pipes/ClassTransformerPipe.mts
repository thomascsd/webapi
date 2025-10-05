import { DeserializerPipe } from '@tsed/platform-params';
import { JsonParameterStore, PipeMethods } from '@tsed/schema';
import { OverrideProvider } from '@tsed/di';
import { plainToInstance } from 'class-transformer';

@OverrideProvider(DeserializerPipe)
export class ClassTransformerPipe implements PipeMethods {
  transform(value: any, metadata: JsonParameterStore) {
    return plainToInstance(metadata.type, value);
  }
}
