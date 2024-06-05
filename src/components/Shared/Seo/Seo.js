import Head from "next/head";

export function Seo(props) {
  const {
    title = "COOPMT",
    description = "Cooperativa de Servicios Múltiples de Empleados del Ministerio de Trabajo.",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}
