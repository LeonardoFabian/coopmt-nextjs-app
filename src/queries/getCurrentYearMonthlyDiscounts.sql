WITH PrestamosActivos AS (
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
    --WHERE ESTATUS <> 'P'
    GROUP BY CLIENTE
  ) c ON a.NUMERO = c.CLIENTE
  WHERE a.CLIENTE = '52'
  --AND ISNULL(c.principalBalance, 0) + ISNULL(c.interestBalance, 0) > 0
),
Aportes AS (
  SELECT
    dbo.fnClarionToSQL([FECHA]) AS transactionDate,
    SUM([VALOR]) AS amount,
    'Aportes' AS description
  FROM [COOPEMT].[dbo].[MOV_ACC]
  WHERE ACCIONISTA = '52'
  AND DESCRIPCION IN ('Ahorro', 'Desc. Nomina CO', 'Desc. Nomina')
  AND YEAR(dbo.fnClarionToSQL([FECHA])) = YEAR(GETDATE())
  GROUP BY dbo.fnClarionToSQL([FECHA])
),
PrestamosCapital AS (
  SELECT
    dbo.fnClarionToSQL([FECHA]) AS transactionDate,
    SUM([EFECTIVO]) AS amount,
    'Prestamos' AS description
  FROM [COOPEMT].[dbo].[CREDIT2]
  WHERE CLIENTE IN (SELECT loanNumber FROM PrestamosActivos)
  AND YEAR(dbo.fnClarionToSQL([FECHA])) = YEAR(GETDATE())
  GROUP BY dbo.fnClarionToSQL([FECHA])
),
PrestamosInteres AS (
  SELECT
    dbo.fnClarionToSQL([FECHA]) AS transactionDate,
    SUM([INTERES]) AS amount,
    'Intereses' AS description
  FROM [COOPEMT].[dbo].[CREDIT2]
  WHERE CLIENTE IN (SELECT loanNumber FROM PrestamosActivos)
  AND YEAR(dbo.fnClarionToSQL([FECHA])) = YEAR(GETDATE())
  GROUP BY dbo.fnClarionToSQL([FECHA])
)

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

ORDER BY transactionDate