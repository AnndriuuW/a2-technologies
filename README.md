# A2 Technologies, landing page

Landing corporativa en español e inglés, hecha con React, TypeScript, Vite y Tailwind CSS. No necesita backend propio: el formulario se envía mediante Formspree.

## Ejecutar

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

| Comando             | Qué hace                                |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Servidor local de desarrollo            |
| `npm run build`     | Revisa TypeScript y genera `dist/`      |
| `npm run preview`   | Sirve localmente el build de producción |
| `npm run typecheck` | Solo revisa TypeScript                  |
| `npm run lint`      | Revisa el código con ESLint             |
| `npm run format`    | Da formato con Prettier                 |

## Estructura

```
public/               favicon.svg, images/og-image.png
src/
  components/         Navbar, Hero, Services, Projects, About, Contact,
                      ContactForm, Footer, WhatsAppButton, PrivacyPolicy
    mockups/          Interfaces de demostración en SVG, traducidas
    ui/               Logo, Modal, SocialLink, iconos de marca, estilos de botón
  config/site.ts      Datos de empresa, enlaces y variables de entorno
  data/               services, projects, team, contactOptions
  hooks/              useScrollAnimation, useActiveSection
  i18n/               Textos ES/EN y selector de idioma
  lib/                contact.ts (Formspree), validation.ts (Zod)
```

`robots.txt` y `sitemap.xml` no están en `public/`: se generan en cada build desde `vite.config.ts`, porque el sitemap necesita la URL absoluta de `VITE_SITE_URL`. Sin esa variable se genera solo `robots.txt`, y el build lo avisa.

## Variables de entorno

Copia `.env.example` como `.env` en local. En Netlify o Vercel se definen en el panel del proyecto. Cualquier cambio requiere un nuevo build.

| Variable                  | Uso                                   | Si queda vacía                                       |
| ------------------------- | ------------------------------------- | ---------------------------------------------------- |
| `VITE_FORMSPREE_ENDPOINT` | Destino del formulario                | El formulario avisa que no está conectado y no envía |
| `VITE_WHATSAPP_NUMBER`    | Solo dígitos en formato internacional | No aparece el botón flotante ni se crea enlace       |
| `VITE_CONTACT_EMAIL`      | Correo público                        | Usa `contacto@a2technologies.com`                    |
| `VITE_SITE_URL`           | Dominio final, sin barra al final     | Sin canonical, sin `og:image` y sin sitemap          |
| `VITE_LINKEDIN_URL`       | Red de la empresa, `https://`         | Icono atenuado, sin enlace                           |
| `VITE_GITHUB_URL`         | Red de la empresa, `https://`         | Icono atenuado, sin enlace                           |
| `VITE_INSTAGRAM_URL`      | Red de la empresa, `https://`         | Icono atenuado, sin enlace                           |

Las variables `VITE_` terminan en el JavaScript público. No pongas secretos en ellas; si una integración necesita credenciales privadas, usa una función serverless.

## Datos que debes reemplazar

- [ ] **Logo:** es provisional. Cambia `LogoMark` en `src/components/ui/Logo.tsx`, `public/favicon.svg` y `public/images/og-image.png` (1200x630).
- [ ] **WhatsApp:** define `VITE_WHATSAPP_NUMBER`.
- [ ] **Correo:** confirma que `contacto@a2technologies.com` es tuyo o define `VITE_CONTACT_EMAIL`.
- [ ] **Formspree:** define `VITE_FORMSPREE_ENDPOINT`.
- [ ] **Dominio:** define `VITE_SITE_URL`.
- [ ] **Redes de la empresa:** define las tres URL.
- [ ] **Fundadores:** en `src/data/team.ts` completa `photo`, `linkedin`, `github` y `email`. Las fotos van en `public/images/team/`.
- [ ] **Proyectos:** en `src/data/projects.ts` revisa textos y módulos. Para usar una captura real, guárdala en `public/images/projects/` en proporción 16:10, indica su ruta en `image` y pon `isDemo: false`.
- [ ] **Política de privacidad:** el texto de `src/i18n/translations.ts` es una base. Hazlo revisar por un asesor legal y luego quita `draftNotice` y su aviso en `src/components/PrivacyPolicy.tsx`.

## Configurar Formspree

1. Crea una cuenta en [formspree.io](https://formspree.io) con el correo que recibirá las solicitudes.
2. Crea un formulario y copia su endpoint, con formato `https://formspree.io/f/xxxxxxxx`.
3. Guárdalo en `VITE_FORMSPREE_ENDPOINT` y genera un nuevo build.
4. Envía una solicitud de prueba desde el sitio publicado y confirma que llega al correo.
5. En el panel de Formspree, limita los dominios permitidos al tuyo si tu plan lo incluye.

Solo se muestra «Solicitud enviada» cuando Formspree responde con éxito. Si falla, el formulario conserva los datos y permite reintentar. Incluye un campo oculto `_gotcha` contra bots.

## Publicar en Netlify

El archivo `netlify.toml` ya define el build, Node 22, las cabeceras de seguridad y la caché.

1. Sube el proyecto a un repositorio de GitHub.
2. En Netlify elige **Add new site > Import an existing project** y selecciona el repositorio.
3. Confirma el comando `npm run build` y la carpeta `dist`.
4. En **Site configuration > Environment variables** agrega las variables.
5. Publica. Cada `git push` a la rama principal generará un nuevo despliegue.

Para Vercel, importa el repositorio y agrega las mismas variables. `vercel.json` trae la configuración equivalente.

## Conectar el dominio

1. En Netlify abre **Domain management > Add a domain** y escribe tu dominio.
2. Crea en tu proveedor los registros DNS que Netlify indique, o cambia los nameservers a los de Netlify.
3. Espera la propagación y confirma que el certificado HTTPS está activo.
4. Define `VITE_SITE_URL` con el dominio final y vuelve a desplegar. Esto activa canonical, `og:image` y sitemap.
5. Envía `https://tu-dominio/sitemap.xml` a Google Search Console.

## Checklist de publicación

- [ ] Datos de la lista anterior reemplazados
- [ ] `npm run build` sin errores
- [ ] Solicitud real recibida en el correo
- [ ] Botón de WhatsApp abre el número correcto
- [ ] Enlaces de redes y fundadores revisados
- [ ] Política de privacidad revisada
- [ ] Vista previa del enlace revisada en redes sociales
- [ ] Sitio revisado en un teléfono real
- [ ] Lighthouse ejecutado sobre la URL publicada
