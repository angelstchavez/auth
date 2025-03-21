import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppName, AppUrl, ContactEmail } from "@/lib/env";

function PrivacyPolicySection() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Política de Privacidad</CardTitle>
          <CardDescription>
            Última actualización: 21 de marzo de 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              En {AppName}, accesible desde {AppUrl}, nos comprometemos a
              proteger la privacidad y seguridad de la información personal de
              nuestros usuarios. Esta política de privacidad describe cómo
              recopilamos, utilizamos, y protegemos su información personal
              cuando utiliza nuestro servicio.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Recopilación y Uso de Información</h3>
            <p className="text-sm text-muted-foreground">
              Recopilamos información como nombre, correo electrónico, número de
              teléfono y datos de pago para procesar transacciones, mejorar
              nuestros servicios y enviar notificaciones.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold">Compartición de Información</h3>
            <p className="text-sm text-muted-foreground">
              No compartimos su información personal con terceros. Sus datos se
              manejan exclusivamente dentro de nuestra plataforma.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold">Seguridad de los Datos</h3>
            <p className="text-sm text-muted-foreground">
              Sus datos se almacenan en una base de datos externa altamente
              segura, la cual solo puede ser consultada por {AppName}.
              Implementamos medidas de seguridad adecuadas para proteger sus
              datos contra accesos no autorizados, alteraciones, divulgaciones o
              destrucción.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold">Derechos del Usuario</h3>
            <p className="text-sm text-muted-foreground">
              Usted tiene derecho a acceder, corregir o eliminar su información
              personal en cualquier momento. Contáctenos en {ContactEmail}
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold">Cookies</h3>
            <p className="text-sm text-muted-foreground">
              {AppName} utiliza cookies para gestionar la autenticación de los
              usuarios. Estas cookies son necesarias para garantizar un acceso
              seguro y personalizado a nuestra plataforma.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold">Cambios en la Política</h3>
            <p className="text-sm text-muted-foreground">
              Nos reservamos el derecho de modificar esta política de privacidad
              en cualquier momento. Le notificaremos cualquier cambio publicando
              la nueva política de privacidad en esta página.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Contacto</h3>
            <p className="text-sm text-muted-foreground">
              Si tiene alguna pregunta o inquietud sobre nuestra política de
              privacidad, puede contactarnos a través de {ContactEmail}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PrivacyPolicySection;
