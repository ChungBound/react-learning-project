"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/code-block";
import { useState, memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ListItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ListProps {
  items: ListItem[];
  onToggle: (id: number) => void;
}

interface ItemProps {
  item: ListItem;
  onToggle: (id: number) => void;
}

// 示例组件：优化前后的列表
function ListOptimizationExample() {
  const [items, setItems] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      text: `项目 ${i}`,
      completed: false,
    }))
  );

  const [newItemText, setNewItemText] = useState("");
  const [count, setCount] = useState(0);

  // 添加新项目
  const handleAddItem = () => {
    if (newItemText.trim()) {
      setItems([
        ...items,
        {
          id: items.length,
          text: newItemText,
          completed: false,
        },
      ]);
      setNewItemText("");
    }
  };

  // 切换项目状态
  const handleToggle = useCallback((id: number) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  return (
    <Card className="p-4 border-dashed">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">列表优化示例</h3>

        <div className="flex gap-2">
          <Input
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="添加新项目..."
            className="max-w-xs"
          />
          <Button onClick={handleAddItem}>添加</Button>
          <Button
            variant="outline"
            onClick={() => setCount(count + 1)}
            className="ml-auto"
          >
            计数: {count}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">未优化列表</h4>
            <div className="h-60 overflow-auto">
              <UnoptimizedList items={items} onToggle={handleToggle} />
            </div>
          </div>
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">优化列表</h4>
            <div className="h-60 overflow-auto">
              <OptimizedList items={items} onToggle={handleToggle} />
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          点击"计数"按钮，观察两个列表的重新渲染情况。未优化的列表会在每次状态更新时重新渲染所有项目，而优化的列表只会在项目数据变化时重新渲染。
        </p>
      </div>
    </Card>
  );
}

// 未优化的列表组件
function UnoptimizedList({ items, onToggle }: ListProps) {
  console.log("UnoptimizedList 渲染");

  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <UnoptimizedItem key={item.id} item={item} onToggle={onToggle} />
      ))}
    </ul>
  );
}

// 未优化的列表项组件
function UnoptimizedItem({ item, onToggle }: ItemProps) {
  console.log(`UnoptimizedItem ${item.id} 渲染`);

  return (
    <li
      className={`p-2 rounded cursor-pointer hover:bg-muted ${
        item.completed ? "line-through text-muted-foreground" : ""
      }`}
      onClick={() => onToggle(item.id)}
    >
      {item.text}
    </li>
  );
}

interface OptimizedListProps {
  items: { id: number; text: string; completed: boolean }[];
  onToggle: (id: number) => void;
}

// 优化的列表组件
const OptimizedList = memo(function OptimizedList({
  items,
  onToggle,
}: OptimizedListProps) {
  console.log("OptimizedList 渲染");

  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <OptimizedItem key={item.id} item={item} onToggle={onToggle} />
      ))}
    </ul>
  );
});

// 优化的列表项组件
const OptimizedItem = memo(function OptimizedItem({
  item,
  onToggle,
}: ItemProps) {
  console.log(`OptimizedItem ${item.id} 渲染`);

  return (
    <li
      className={`p-2 rounded cursor-pointer hover:bg-muted ${
        item.completed ? "line-through text-muted-foreground" : ""
      }`}
      onClick={() => onToggle(item.id)}
    >
      {item.text}
    </li>
  );
});

export default function ListOptimizationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">列表优化</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>React 列表渲染优化</CardTitle>
            <CardDescription>
              了解如何优化 React 中的列表渲染性能。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 React
              应用中，列表渲染是一个常见的性能瓶颈，特别是当列表包含大量项目或复杂组件时。优化列表渲染可以显著提高应用的性能和用户体验。
            </p>
            <p className="mb-4">
              本页面将介绍一些优化 React 列表渲染的技术和最佳实践，包括使用
              React.memo、虚拟化、键优化等。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>列表渲染的性能问题</CardTitle>
            <CardDescription>了解列表渲染中常见的性能问题。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 React
              中，当状态或属性变化时，组件会重新渲染。对于列表来说，这可能导致以下性能问题：
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>所有列表项都重新渲染，即使只有一个项目发生变化</li>
              <li>大量 DOM 操作，导致页面卡顿</li>
              <li>不必要的计算和内存使用</li>
              <li>渲染延迟，影响用户体验</li>
            </ul>
            <p className="mb-4">这些问题在以下情况下尤为明显：</p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>列表包含大量项目（数百或数千个）</li>
              <li>列表项是复杂的组件，包含多个子组件或复杂的渲染逻辑</li>
              <li>频繁的状态更新，如实时数据、用户交互等</li>
              <li>在低性能设备上运行的应用</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用 React.memo 优化列表项</CardTitle>
            <CardDescription>
              通过记忆化组件避免不必要的重新渲染。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              使用 React.memo 可以记忆化列表项组件，只有当组件的 props
              变化时才重新渲染。这对于优化列表渲染非常有效。
            </p>
            <CodeBlock language="tsx">{`import { memo, useState } from 'react';

// 未优化的列表项组件
function ListItem({ item, onToggle }) {
  console.log(\`渲染项目: \${item.id}\`);
  
  return (
    <li onClick={() => onToggle(item.id)}>
      {item.text}
    </li>
  );
}

// 优化的列表项组件
const MemoizedListItem = memo(function ListItem({ item, onToggle }) {
  console.log(\`渲染项目: \${item.id}\`);
  
  return (
    <li onClick={() => onToggle(item.id)}>
      {item.text}
    </li>
  );
});

// 列表组件
function List({ items, onToggle }) {
  return (
    <ul>
      {items.map(item => (
        <MemoizedListItem 
          key={item.id} 
          item={item} 
          onToggle={onToggle} 
        />
      ))}
    </ul>
  );
}

// 父组件
function TodoApp() {
  const [items, setItems] = useState([
    { id: 1, text: '学习 React', completed: false },
    { id: 2, text: '完成项目', completed: false }
  ]);
  
  // 使用 useCallback 记忆化回调函数
  const handleToggle = useCallback((id) => {
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);
  
  return <List items={items} onToggle={handleToggle} />;
}`}</CodeBlock>
            <p className="mt-4">
              在上面的例子中，<code>MemoizedListItem</code> 组件使用{" "}
              <code>React.memo</code> 包装，只有当 <code>item</code> 或{" "}
              <code>onToggle</code>{" "}
              属性变化时才会重新渲染。这可以显著减少不必要的渲染。
            </p>
            <p className="mt-2">
              注意，为了使 <code>React.memo</code> 有效，还需要确保传递给组件的
              props（特别是函数和对象）不会在每次渲染时创建新的引用。这就是为什么我们使用{" "}
              <code>useCallback</code> 来记忆化 <code>handleToggle</code> 函数。
            </p>
            <div className="mt-6 border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                实时示例：
              </h4>
              <ListOptimizationExample />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>虚拟化列表</CardTitle>
            <CardDescription>只渲染可见区域内的列表项。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              虚拟化是一种只渲染当前可见区域内的列表项的技术，而不是渲染整个列表。这对于非常长的列表（数百或数千个项目）特别有效。
            </p>
            <p className="mb-4">
              React 生态系统中有几个优秀的虚拟化库，如 <code>react-window</code>{" "}
              和 <code>react-virtualized</code>
              。下面是使用 <code>react-window</code> 的示例：
            </p>
            <CodeBlock language="tsx">{`import { FixedSizeList } from 'react-window';
import { memo } from 'react';

// 列表项组件
const Row = memo(({ index, style, data }) => {
  const item = data.items[index];
  
  return (
    <div style={style} onClick={() => data.onToggle(item.id)}>
      {item.text}
    </div>
  );
});

// 虚拟化列表组件
function VirtualizedList({ items, onToggle }) {
  // 传递给列表项的数据
  const itemData = { items, onToggle };
  
  return (
    <FixedSizeList
      height={400} // 列表的高度
      width="100%" // 列表的宽度
      itemCount={items.length} // 项目总数
      itemSize={35} // 每个项目的高度
      itemData={itemData} // 传递给项目的数据
    >
      {Row}
    </FixedSizeList>
  );
}

// 使用示例
function App() {
  const [items, setItems] = useState(
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      text: \`项目 \${i}\`,
      completed: false
    }))
  );
  
  const handleToggle = useCallback((id) => {
    setItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);
  
  return <VirtualizedList items={items} onToggle={handleToggle} />;
}`}</CodeBlock>
            <p className="mt-4">虚拟化的优势：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>显著减少 DOM 节点数量，提高渲染性能</li>
              <li>减少内存使用</li>
              <li>平滑的滚动体验，即使是在低性能设备上</li>
              <li>支持大数据集的高效渲染</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>键优化</CardTitle>
            <CardDescription>正确使用键来优化列表更新。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              在 React 中，键（key）是用来帮助 React
              识别哪些项目已更改、添加或删除的特殊属性。正确使用键可以显著提高列表更新的性能。
            </p>
            <Tabs defaultValue="good">
              <TabsList className="mb-4">
                <TabsTrigger value="good">良好实践</TabsTrigger>
                <TabsTrigger value="bad">不良实践</TabsTrigger>
              </TabsList>
              <TabsContent value="good">
                <CodeBlock language="tsx">{`// 良好实践：使用唯一且稳定的键
function GoodList({ items }) {
  return (
    <ul>
      {items.map(item => (
        // 使用唯一的 ID 作为键
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

// 如果项目没有唯一 ID，可以使用其他唯一标识符
function AnotherGoodList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // 使用项目内容的哈希作为键
        <li key={hashFunction(item.text)}>{item.text}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>
              </TabsContent>
              <TabsContent value="bad">
                <CodeBlock language="tsx">{`// 不良实践：使用索引作为键
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // 使用索引作为键可能导致性能问题和 bug
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  );
}

// 不良实践：使用不稳定的键
function AnotherBadList({ items }) {
  return (
    <ul>
      {items.map(item => (
        // 使用随机数或时间戳作为键会导致每次渲染时键都不同
        <li key={Math.random()}>{item.text}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>
              </TabsContent>
            </Tabs>
            <p className="mt-4">使用索引作为键的问题：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>当列表项的顺序变化时，索引也会变化，导致不必要的重新渲染</li>
              <li>可能导致状态错误，特别是当列表项有状态时</li>
              <li>可能导致性能问题，因为 React 无法正确识别哪些项目已更改</li>
            </ul>
            <p className="mt-4">
              最佳实践是使用唯一且稳定的键，如项目的 ID
              或其他唯一标识符。只有在列表是静态的（不会重新排序、添加或删除项目）且没有其他唯一标识符可用时，才考虑使用索引作为键。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>列表项懒加载</CardTitle>
            <CardDescription>
              逐步加载列表项以提高初始加载性能。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              对于非常长的列表，可以考虑实现懒加载，即初始只加载部分项目，然后在用户滚动到底部时加载更多。这可以显著提高初始加载性能。
            </p>
            <CodeBlock language="tsx">{`import { useState, useEffect, useRef } from 'react';

function LazyLoadList({ fetchItems }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  
  // 加载更多项目
  const loadMoreItems = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newItems = await fetchItems(page);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prevItems => [...prevItems, ...newItems]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('加载项目出错:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 初始加载
  useEffect(() => {
    loadMoreItems();
  }, []);
  
  // 设置交叉观察器以检测何时滚动到底部
  const lastItemRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreItems();
      }
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);
  
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li 
            key={item.id} 
            ref={index === items.length - 1 ? lastItemRef : null}
          >
            {item.text}
          </li>
        ))}
      </ul>
      {loading && <div>加载中...</div>}
      {!hasMore && <div>没有更多项目</div>}
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">这种方法的优势：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>减少初始加载时间和资源使用</li>
              <li>提高用户体验，特别是在移动设备上</li>
              <li>减少服务器负载，因为只获取用户实际需要的数据</li>
              <li>支持无限滚动，用户可以持续加载更多内容</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>列表分页</CardTitle>
            <CardDescription>使用分页控制一次显示的项目数量。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              分页是另一种控制一次显示的项目数量的方法。与懒加载不同，分页通常提供明确的导航控件，允许用户在不同页面之间跳转。
            </p>
            <CodeBlock language="tsx">{`import { useState, useEffect } from 'react';

function PaginatedList({ fetchItems, itemsPerPage = 10 }) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // 加载特定页面的项目
  const loadPage = async (page) => {
    setLoading(true);
    try {
      const result = await fetchItems(page, itemsPerPage);
      setItems(result.items);
      setTotalPages(Math.ceil(result.total / itemsPerPage));
    } catch (error) {
      console.error('加载页面出错:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 当页面变化时加载新数据
  useEffect(() => {
    loadPage(currentPage);
  }, [currentPage]);
  
  // 页面导航
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return (
    <div>
      {loading ? (
        <div>加载中...</div>
      ) : (
        <>
          <ul>
            {items.map(item => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
          
          <div className="pagination">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              上一页
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              下一页
            </button>
          </div>
        </>
      )}
    </div>
  );
}`}</CodeBlock>
            <p className="mt-4">分页的优势：</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>用户可以直接跳转到特定页面</li>
              <li>适合需要精确导航的场景，如数据表格</li>
              <li>减少一次性加载的数据量</li>
              <li>提供更好的用户体验，特别是对于习惯传统分页的用户</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最佳实践</CardTitle>
            <CardDescription>
              优化 React 列表渲染的一些最佳实践。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>使用唯一且稳定的键</strong>
                ：为列表项提供唯一且稳定的键，避免使用索引作为键（除非列表是静态的）。
              </li>
              <li>
                <strong>记忆化列表项组件</strong>：使用 React.memo
                包装列表项组件，避免不必要的重新渲染。
              </li>
              <li>
                <strong>记忆化回调函数</strong>：使用 useCallback
                记忆化传递给列表项的回调函数，确保它们的引用稳定。
              </li>
              <li>
                <strong>考虑虚拟化</strong>
                ：对于长列表，使用虚拟化技术只渲染可见区域内的项目。
              </li>
              <li>
                <strong>实现分页或懒加载</strong>
                ：控制一次显示的项目数量，减少初始加载时间和资源使用。
              </li>
              <li>
                <strong>避免在渲染函数中创建新对象或数组</strong>
                ：这可能导致不必要的重新渲染。使用 useMemo 记忆化计算结果。
              </li>
              <li>
                <strong>使用不可变数据</strong>
                ：确保状态更新使用不可变模式，这有助于 React 的比较优化。
              </li>
              <li>
                <strong>考虑使用专门的状态管理库</strong>
                ：对于复杂的列表状态，考虑使用 Redux、Zustand
                等状态管理库，它们通常有优化的更新机制。
              </li>
            </ul>
            <CodeBlock language="tsx" className="mt-4">{`// 综合最佳实践示例
import { useState, useCallback, useMemo, memo } from 'react';
import { FixedSizeList } from 'react-window';

// 记忆化列表项组件
const ListItem = memo(function ListItem({ item, onToggle }) {
  return (
    <div 
      className={\`list-item \${item.completed ? 'completed' : ''}\`}
      onClick={() => onToggle(item.id)}
    >
      {item.text}
    </div>
  );
});

// 记忆化行组件（用于虚拟化列表）
const Row = memo(({ index, style, data }) => {
  const item = data.items[index];
  return (
    <div style={style}>
      <ListItem 
        item={item} 
        onToggle={data.onToggle} 
      />
    </div>
  );
});

// 优化的列表组件
function OptimizedList({ items: rawItems, filter }) {
  // 记忆化过滤后的项目
  const items = useMemo(() => {
    return rawItems.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'completed') return item.completed;
      if (filter === 'active') return !item.completed;
      return true;
    });
  }, [rawItems, filter]);
  
  // 记忆化切换函数
  const handleToggle = useCallback((id) => {
    // 使用不可变更新模式
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);
  
  // 如果列表很长，使用虚拟化
  if (items.length > 100) {
    return (
      <FixedSizeList
        height={400}
        width="100%"
        itemCount={items.length}
        itemSize={35}
        itemData={{ items, onToggle: handleToggle }}
      >
        {Row}
      </FixedSizeList>
    );
  }
  
  // 对于较短的列表，使用普通渲染
  return (
    <div>
      {items.map(item => (
        <ListItem 
          key={item.id} 
          item={item} 
          onToggle={handleToggle} 
        />
      ))}
    </div>
  );
}`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
