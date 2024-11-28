SELECT dbo.fnClarionToSQl([FECHA]) AS transactionDate
      ,[VALOR] AS amount
      ,CASE WHEN [DESCRIPCION] IN ('Ahorro', 'Desc. Nomina CO', 'Desc. Nomina') THEN 'Aportes' ELSE 'Retiro' END AS description
  FROM [COOPEMT].[dbo].[MOV_ACC]
  WHERE ACCIONISTA = '52'
  AND DESCRIPCION IN ('Ahorro', 'Desc. Nomina CO', 'Desc. Nomina')
