<script setup>
import BotonAccion from './BotonAccion.vue'

// 1. PROPS: Datos que recibe el componente para personalizar el mensaje vacío
const props = defineProps({
  // Nombre del ícono de Material Icons (ej: 'history', 'directions_car', 'groups')
  icono: { type: String, default: 'inbox' },
  // Título principal que se muestra en negrita
  titulo: { type: String, required: true },
  // Texto explicativo secundario debajo del título
  descripcion: { type: String, default: '' },
  // Texto opcional para mostrar un botón de acción debajo del mensaje
  textoBoton: { type: String, default: '' },
  // Ícono opcional para el botón de acción
  iconoBoton: { type: String, default: '' },
  // Estilo del botón ('secundario', 'primario', 'accion-suave', etc.)
  varianteBoton: { type: String, default: 'secundario' },
})

// 2. EMITS: Avisa al componente padre cuando el usuario hace clic en el botón
const emit = defineEmits(['accion'])
</script>

<template>
  <q-card-section class="empty-state column items-center text-center">
    <q-avatar class="empty-icon" size="48px">
      <q-icon :name="props.icono" size="24px" />
    </q-avatar>

    <q-item-label class="empty-state-title text-weight-bold q-mt-xs">
      {{ props.titulo }}
    </q-item-label>

    <q-item-label v-if="props.descripcion" caption class="empty-state-desc q-mt-xs q-mb-md">
      {{ props.descripcion }}
    </q-item-label>

    <BotonAccion
      v-if="props.textoBoton"
      :variante="props.varianteBoton"
      :icono="props.iconoBoton"
      :etiqueta="props.textoBoton"
      @click="emit('accion')"
    />

    <slot />
  </q-card-section>
</template>
