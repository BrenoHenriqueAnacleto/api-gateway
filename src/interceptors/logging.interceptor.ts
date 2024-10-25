import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Inicio...')
        const now = Date.now()

        return next
        .handle()
        .pipe(
            tap(() => console.log(`Termino em: ${Date.now() - now} ms`)),
        )
    }
}