SELECT [ACCIONISTA] AS accountNumber
      ,dbo.fnClarionToSQL([FECHA]) AS transactionDate
      ,RTRIM([DOCUMENTO]) AS 'number'
      ,[VALOR] as amount
      ,'Aportes' as context
      ,[detalle] as details
  FROM [COOPEMT].[dbo].[MOV_ACC]
  WHERE [ACCIONISTA] = '52'
  AND [DESCRIPCION] IN ('Ahorro', 'Desc. Nomina CO', 'Desc. Nomina')
  ORDER BY [FECHA] DESC
  OFFSET 0 ROWS
  FETCH NEXT 10 ROWS ONLY