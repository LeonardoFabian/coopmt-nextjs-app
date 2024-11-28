CREATE VIEW PORTAL_NOMINA_EMPLEADOS AS
SELECT 
    -- Campos de la tabla PORTAL_NOMINA_POR_GRUPOS
    REPLACE(p.[CEDULA], '-', '') AS CEDULA,
    p.[NOMBRE] AS NOMBRE,
    p.[DEPARTAMENTO] AS DEPARTAMENTO,
    p.[TIPO] AS TIPO,
    p.[GRUPO] AS GRUPO,
    p.[CARGO] AS CARGO,
    p.[Sueldo Bruto Fijos] AS SALARIO,
    
    -- Columna adicional CARRERA_ADMINISTRATIVA
    CASE 
        WHEN c.[CEDULA] IS NOT NULL THEN 'S' 
        ELSE NULL 
    END AS CARRERA_ADMINISTRATIVA
FROM 
    [COOPEMT].[dbo].[PORTAL_NOMINA_POR_GRUPOS] p
LEFT JOIN 
    [COOPEMT].[dbo].[PORTAL_NOMINA_CARRERA] c 
    ON REPLACE(p.[CEDULA], '-', '') = REPLACE(c.[CEDULA], '-', '');