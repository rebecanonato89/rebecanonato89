<template>
  <li class="ide-tree-node" role="treeitem" :aria-expanded="isFolder ? expanded : null">
    <button
      type="button"
      class="ide-tree-row"
      :class="{ 'ide-tree-row--active': isActive }"
      :style="{ paddingLeft: (depth * 16 + 10) + 'px' }"
      @click="onClick"
    >
      <IdeIcon v-if="isFolder" type="chevron" class="ide-tree-chevron" :class="{ 'ide-tree-chevron--open': expanded }" />
      <span v-else class="ide-tree-chevron-spacer"></span>
      <IdeIcon
        :type="isFolder ? (expanded ? 'folder-open' : 'folder') : node.icon"
        class="ide-tree-icon"
        :class="'ide-tree-icon--' + (isFolder ? 'folder' : node.icon)"
      />
      <span class="ide-tree-label">{{ node.label }}</span>
    </button>
    <ul v-if="isFolder && expanded" class="ide-tree" role="group">
      <IdeTreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :active-node-id="activeNodeId"
        @open="$emit('open', $event)"
      />
    </ul>
  </li>
</template>

<script>
import IdeIcon from './IdeIcon.vue';

export default {
  name: 'IdeTreeNode',
  components: { IdeIcon },
  props: {
    node: { type: Object, required: true },
    depth: { type: Number, default: 0 },
    activeNodeId: { type: String, default: '' },
  },
  emits: ['open'],
  data() {
    return { expanded: this.node.expanded !== false };
  },
  computed: {
    isFolder() {
      return this.node.type === 'folder';
    },
    isActive() {
      return !this.isFolder && this.node.id === this.activeNodeId;
    },
  },
  methods: {
    onClick() {
      if (this.isFolder) {
        this.expanded = !this.expanded;
      } else {
        this.$emit('open', this.node);
      }
    },
  },
};
</script>

<style scoped>
.ide-tree, .ide-tree-node { list-style: none; }

.ide-tree-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-main);
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  font-family: var(--font-code);
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ide-tree-row:hover { background: var(--ide-sidebar-hover); }
.ide-tree-row--active {
  background: var(--ide-sidebar-active-bg);
  color: var(--ide-sidebar-active-text);
  font-weight: 600;
}

.ide-tree-chevron {
  width: 12px; height: 12px; flex-shrink: 0;
  color: var(--text-muted);
  transition: transform 0.15s ease;
}
.ide-tree-chevron--open { transform: rotate(90deg); }
.ide-tree-chevron-spacer { width: 12px; flex-shrink: 0; }

.ide-tree-icon { width: 16px; height: 16px; flex-shrink: 0; }
.ide-tree-icon--folder { color: var(--ide-icon-folder); }
.ide-tree-icon--vue { color: var(--ide-icon-vue); }
.ide-tree-icon--js { color: var(--ide-icon-js); }
.ide-tree-icon--json { color: var(--ide-icon-json); }
.ide-tree-icon--md { color: var(--ide-icon-md); }
.ide-tree-icon--log { color: var(--ide-icon-log); }
.ide-tree-icon--game { color: var(--ide-icon-json); }

.ide-tree-label { overflow: hidden; text-overflow: ellipsis; }
</style>
