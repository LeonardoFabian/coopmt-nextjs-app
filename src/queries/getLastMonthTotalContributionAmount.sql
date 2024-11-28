SELECT TOP 1
    dbo.fnClarionToSQl([FECHA]) AS transactionDate
    ,SUM([VALOR]) AS amount
FROM [COOPEMT].[dbo].[MOV_ACC]
WHERE ACCIONISTA = '52'
AND DESCRIPCION IN ('Ahorro', 'Desc. Nomina CO', 'Desc. Nomina')
GROUP BY dbo.fnClarionToSQl([FECHA])
ORDER BY transactionDate DESC
