<template>
  <nav class="ide-sidebar" aria-label="Árvore do projeto">
    <div class="ide-sidebar-header">
      <span>PROJETO</span>
      <button type="button" class="ide-sidebar-collapse" aria-label="Recolher painel de projeto" @click="$emit('collapse')">
        <IdeIcon type="chevron" style="transform: rotate(180deg);" />
      </button>
    </div>
    <ul class="ide-tree" role="tree">
      <IdeTreeNode
        v-for="node in tree"
        :key="node.id"
        :node="node"
        :depth="0"
        :active-node-id="activeNodeId"
        @open="$emit('open', $event)"
      />
    </ul>
  </nav>
</template>

<script>
import IdeIcon from './IdeIcon.vue';
import IdeTreeNode from './IdeTreeNode.vue';

export default {
  name: 'IdeSidebar',
  components: { IdeIcon, IdeTreeNode },
  props: {
    tree: { type: Array, required: true },
    activeNodeId: { type: String, default: '' },
  },
  emits: ['open', 'collapse'],
};
</script>

<style scoped>
.ide-sidebar {
  width: 260px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  background: var(--ide-sidebar-bg);
  border-right: 1px solid var(--ide-border);
  font-family: var(--font-code);
  font-size: 0.85rem;
}

.ide-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  font-family: var(--font-ui);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--ide-border);
  position: sticky;
  top: 0;
  background: var(--ide-sidebar-bg);
  z-index: 1;
}

.ide-sidebar-collapse {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 4px;
  font-size: 0.85rem;
}
.ide-sidebar-collapse:hover { color: var(--accent-core); background: var(--ide-sidebar-hover); }

.ide-tree { list-style: none; }
</style>
