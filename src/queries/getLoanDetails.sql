-- muestra los detalles de un prestamo
SELECT
  a.NUMERO AS number,
  RTRIM(b.DESCRIPCION) AS type,
  a.MONTO AS amount,
  a.CUOTAS AS installments,
  ISNULL(c.principalBalance, 0) AS principalBalance,
  ISNULL(c.interestBalance, 0) AS interestBalance,
  ISNULL(c.principalBalance, 0) + ISNULL(c.interestBalance, 0) AS totalBalance,
  dbo.fnClarionToSQL(a.FEC_DES) AS disbursementDate,
  dbo.fnClarionToSQL(a.FECHA_VENCI) AS maturityDate
FROM [dbo].[maestro] a
LEFT JOIN [dbo].[CLASI] b ON a.TIPO = b.NUMERO
LEFT JOIN (
  SELECT
    SUM(BAL_CAP) AS principalBalance,
    SUM(CASE WHEN dbo.fnClarionToSQL(fecha) <= getdate() THEN BAL_INT ELSE 0 END) AS interestBalance,
    CLIENTE
  FROM [dbo].[PROYECTA]
  GROUP BY CLIENTE
) c ON a.NUMERO = c.CLIENTE
WHERE a.NUMERO = '4730' 