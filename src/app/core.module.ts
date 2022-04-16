import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthService } from "./authentication/auth.service";
import { AuthGaurd } from "./authentication/authGaurd.service";
import { AuthInterceptor } from "./authentication/authInterceptor.service";

@NgModule({
  providers: [AuthGaurd,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
})
export class CoreModule {}
