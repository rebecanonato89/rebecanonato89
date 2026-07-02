<template>
  <Teleport to="body">
    <div
      class="preview-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="`Prévia de ${title}`"
      @click.self="$emit('close')"
      @keydown.esc="$emit('close')"
    >
      <div class="preview-modal">
        <header class="preview-header">
          <h3>{{ title }}</h3>
          <button class="preview-close" type="button" aria-label="Fechar prévia" @click="$emit('close')">
            ✕
          </button>
        </header>

        <div class="preview-stage">
          <button
            v-if="images.length > 1"
            type="button"
            class="preview-nav preview-nav--prev"
            aria-label="Imagem anterior"
            @click="prev"
          >
            &larr;
          </button>

          <img :src="images[index].src" :alt="images[index].alt" class="preview-image" />

          <button
            v-if="images.length > 1"
            type="button"
            class="preview-nav preview-nav--next"
            aria-label="Próxima imagem"
            @click="next"
          >
            &rarr;
          </button>
        </div>

        <p class="preview-caption">{{ images[index].alt }}</p>

        <div v-if="images.length > 1" class="preview-dots" role="tablist" aria-label="Selecionar imagem">
          <button
            v-for="(img, i) in images"
            :key="img.src"
            type="button"
            class="preview-dot"
            :class="{ 'preview-dot--active': i === index }"
            :aria-label="`Ir para imagem ${i + 1} de ${images.length}`"
            :aria-selected="i === index"
            role="tab"
            @click="index = i"
          ></button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'ProjectPreviewModal',
  props: {
    title: { type: String, required: true },
    images: { type: Array, required: true }
  },
  emits: ['close'],
  data() {
    return { index: 0 };
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = '';
  },
  methods: {
    handleKeydown(e) {
      if (e.key === 'Escape') this.$emit('close');
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    },
    next() {
      this.index = (this.index + 1) % this.images.length;
    },
    prev() {
      this.index = (this.index - 1 + this.images.length) % this.images.length;
    }
  }
};
</script>

<style scoped>
.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(3, 5, 9, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: var(--space-lg);
}

.preview-modal {
  background: var(--bg-surface);
  border: 1px solid var(--cyan-border);
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  padding: var(--space-lg);
  box-shadow: 0 0 40px var(--cyan-dim);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}
.preview-header h3 {
  font-family: var(--font-ui);
  font-size: 1.4rem;
  color: var(--text-main);
}

.preview-close {
  background: transparent;
  border: 1px solid var(--cyan-border);
  color: var(--text-main);
  border-radius: 6px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}
.preview-close:hover, .preview-close:focus-visible {
  background: var(--cyan-core);
  color: var(--bg-base);
}

.preview-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--cyan-dim);
}

.preview-image {
  width: 100%;
  height: auto;
  max-height: 65vh;
  object-fit: contain;
  display: block;
  background: var(--bg-base);
}

.preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-surface);
  border: 1px solid var(--cyan-border);
  color: var(--cyan-core);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 1;
}
.preview-nav:hover, .preview-nav:focus-visible {
  background: var(--cyan-core);
  color: var(--bg-base);
}
.preview-nav--prev { left: var(--space-md); }
.preview-nav--next { right: var(--space-md); }

.preview-caption {
  margin-top: var(--space-md);
  color: var(--text-muted);
  font-family: var(--font-code);
  font-size: 0.85rem;
  text-align: center;
}

.preview-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: var(--space-md);
}
.preview-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid var(--cyan-border);
  background: transparent;
  cursor: pointer;
  padding: 0;
}
.preview-dot--active {
  background: var(--cyan-core);
  box-shadow: 0 0 8px var(--cyan-dim);
}

@media (max-width: 600px) {
  .preview-modal { padding: var(--space-md); }
  .preview-nav { width: 34px; height: 34px; }
}
</style>
