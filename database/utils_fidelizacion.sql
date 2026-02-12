-- Script para limpiar datos de prueba si fuera necesario
TRUNCATE TABLE public.clientes_fidelizacion;

-- Script para invalidar un cupón manualmente
UPDATE public.clientes_fidelizacion 
SET estado = 'canjeado', fecha_canje = NOW() 
WHERE codigo_descuento = 'CODIGO_A_INVALIDAR';
