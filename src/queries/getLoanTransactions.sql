SELECT TOP (1000) [NUMERO]
      ,[VALOR]
      ,[FECHA]
      ,[CLIENTE]
      ,[COBRADOR]
      ,[EFECTIVO]
      ,[CHEQUES]
      ,[CONCEPTO]
      ,[TOTAL]
      ,[PENDIENTE]
      ,[ESTATUS]
      ,[INTERES]
      ,[ABONO]
      ,[INT2]
      ,[CAPITAL]
      ,[MORA]
      ,[CANCELA]
      ,[INT_PEND]
      ,[POR_MORA]
      ,[BALANCE]
      ,[DIAS]
      ,[BANCO]
      ,[TIPO]
      ,[REPRESENTA]
      ,[CHEQUE_NO]
      ,[BANCO_CK]
      ,[VAL_CAP]
      ,[VAL_INT]
      ,[VAL_MORA]
      ,[CLI_NOMBRE]
      ,[SEGURO]
      ,[VAL_SEG]
      ,[SOLICITUD]
  FROM [COOPEMT].[dbo].[CREDIT2]
  where CLIENTE = '2814'
  --Transacciones de un prestamo