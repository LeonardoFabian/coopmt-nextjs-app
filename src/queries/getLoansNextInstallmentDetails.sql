-- Retorna la proxima cuota de todos los prestamos activos de un socio

-- Obtener todos los prestamos por socio
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
  WHERE a.CLIENTE = '394' -- Parámetro que recibirás en el servicio de Strapi memberId
  AND ISNULL(c.principalBalance, 0) + ISNULL(c.interestBalance, 0) > 0
),
LoanAmortizationSchedule AS (
     SELECT
            CLIENTE AS loanNumber,
            dbo.fnClarionToSQL(FECHA) AS installmentDate,
            FACTURA AS installmentNumber,
            VALOR AS installmentPrincipalAmount,
            INTERES AS installmentInterestAmount,
            SEGURO AS installmentInsuranceAmount,
            BAL_CAP AS installmentPrincipalBalance,
            BAL_INT AS installmentInterestBalance,
            BAL_SEG AS installmentInsuranceBalance,
            ESTATUS AS installmentStatus
          FROM [dbo].[PROYECTA]
          WHERE CLIENTE IN (SELECT loanNumber FROM PrestamosActivos)
        --   ORDER BY installmentDate ASC
)
-- Mostrar total del ultimo mes
SELECT TOP 1
    loanNumber,
    installmentDate,
    installmentNumber,
    installmentPrincipalAmount,
     installmentInterestAmount
FROM LoanAmortizationSchedule
ORDER BY installmentDate ASC
