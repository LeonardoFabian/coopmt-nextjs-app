
-- Retorna el valor del capital e interes de la proxima cuota de un prestamo
SELECT TOP 1
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
    WHERE CLIENTE = '4730'
ORDER BY installmentDate ASC
