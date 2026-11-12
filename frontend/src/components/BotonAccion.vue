<script setup>
import { computed } from 'vue'

const props = defineProps({
  etiqueta: { type: String, default: '' },
  variante: {
    type: String,
    default: 'primario',
    validator: (valor) =>
      ['primario', 'secundario', 'peligro', 'accion', 'accion-peligro', 'accion-suave'].includes(valor),
  },
  icono: { type: String, default: '' },
  iconoDerecha: { type: String, default: '' },
  tipo: { type: String, default: 'button' },
  cargando: { type: Boolean, default: false },
  deshabilitado: { type: Boolean, default: false },
  denso: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

const clasesBoton = computed(() => {
  switch (props.variante) {
    case 'secundario':
      return 'secondary-button'
    case 'peligro':
      return 'primary-button danger-button'
    case 'accion':
      return 'icon-action'
    case 'accion-peligro':
      return 'icon-action is-danger'
    case 'accion-suave':
      return 'summary-action-btn is-primary-soft'
    default:
      return 'primary-button'
  }
})

const esPlano = computed(() =>
  ['secundario', 'accion', 'accion-peligro', 'accion-suave'].includes(props.variante),
)
</script>

<template>
  <q-btn
    :flat="esPlano"
    :unelevated="!esPlano"
    no-caps
    :dense="props.denso || ['accion', 'accion-peligro'].includes(props.variante)"
    :type="props.tipo"
    :class="clasesBoton"
    :label="props.etiqueta"
    :icon="props.icono || undefined"
    :icon-right="props.iconoDerecha || undefined"
    :loading="props.cargando"
    :disable="props.deshabilitado || props.cargando"
    @click="emit('click', $event)"
  />
</template>
