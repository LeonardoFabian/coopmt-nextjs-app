-- Obtener todos los prestamos por socio
WITH PrestamosPorSocio AS (
  -- Obtener los números de préstamos activos asociados al miembro (accionista)
  SELECT 
    a.NUMERO AS loanNumber
  FROM [dbo].[maestro] a
  LEFT JOIN [dbo].[CLASI] b ON a.TIPO = b.NUMERO
  LEFT JOIN (
    SELECT
      CLIENTE,
      SUM(BAL_CAP) AS principalBalance,
      SUM(CASE WHEN dbo.fnClarionToSQL(fecha) <= getdate() THEN BAL_INT ELSE 0 END) AS interestBalance
    FROM [dbo].[PROYECTA]
    GROUP BY CLIENTE
  ) c ON a.NUMERO = c.CLIENTE
  WHERE a.CLIENTE = '52' -- Parámetro que recibirás en el servicio de Strapi
),
TotalCuotaPrestamo AS (
    SELECT 
        dbo.fnClarionToSQl([FECHA]) AS transactionDate,
        SUM([TOTAL]) AS amount
    FROM [COOPEMT].[dbo].[CREDIT2]
    WHERE CLIENTE IN (SELECT loanNumber FROM PrestamosPorSocio)
    GROUP BY dbo.fnClarionToSQl([FECHA])

)
-- Mostrar total del ultimo mes
SELECT TOP 1
    transactionDate,
    amount 
FROM TotalCuotaPrestamo
ORDER BY transactionDate DESC

