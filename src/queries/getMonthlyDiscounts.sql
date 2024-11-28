WITH PrestamosActivos AS (
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
    WHERE ESTATUS <> 'P'
    GROUP BY CLIENTE
  ) c ON a.NUMERO = c.CLIENTE
  WHERE a.CLIENTE = '52' -- Parámetro que recibirás en el servicio de Strapi
  AND ISNULL(c.principalBalance, 0) + ISNULL(c.interestBalance, 0) > 0
),
Aportes AS (
  -- Obtener los aportes por mes del accionista
  SELECT 
    dbo.fnClarionToSQL([FECHA]) AS transactionDate,
    SUM([VALOR]) AS amount,
    'Aportes' AS description
  FROM [COOPEMT].[dbo].[MOV_ACC]
  WHERE ACCIONISTA = '52' -- Parámetro que recibirás en el servicio de Strapi
  AND DESCRIPCION IN ('Ahorro', 'Desc. Nomina CO', 'Desc. Nomina')
  GROUP BY dbo.fnClarionToSQL([FECHA])
),
PrestamosCapital AS (
  -- Obtener las cuotas de capital por mes de todos los préstamos activos
  SELECT 
    dbo.fnClarionToSQL([FECHA]) AS transactionDate,
    SUM([EFECTIVO]) AS amount,
    'Prestamos - Capital' AS description
  FROM [COOPEMT].[dbo].[CREDIT2]
  WHERE CLIENTE IN (SELECT loanNumber FROM PrestamosActivos) -- Filtra por los préstamos activos
  GROUP BY dbo.fnClarionToSQL([FECHA])
),
PrestamosInteres AS (
  -- Obtener los intereses por mes de todos los préstamos activos
  SELECT 
    dbo.fnClarionToSQL([FECHA]) AS transactionDate,
    SUM([INTERES]) AS amount,
    'Prestamos - Interés' AS description
  FROM [COOPEMT].[dbo].[CREDIT2]
  WHERE CLIENTE IN (SELECT loanNumber FROM PrestamosActivos) -- Filtra por los préstamos activos
  GROUP BY dbo.fnClarionToSQL([FECHA])
)
-- Combina los resultados de las tres consultas
SELECT 
  transactionDate, 
  amount, 
  description
FROM Aportes

UNION ALL

SELECT 
  transactionDate, 
  amount, 
  description
FROM PrestamosCapital

UNION ALL

SELECT 
  transactionDate, 
  amount, 
  description
FROM PrestamosInteres

ORDER BY transactionDate;
