アーキテクチャ
==============

レイヤー構成
------------

.. list-table::
   :header-rows: 1
   :widths: 22 34 44

   * - レイヤー
     - 主なファイル
     - 責務
   * - 表示層
     - ``src/app/(main)``、``src/components``
     - 公開ページ、ルートハンドラー、共通 UI、リッチテキスト、レイアウト。
   * - コンテンツアクセス層
     - ``src/lib/payload-posts.ts``
     - Payload を問い合わせ、CMS ドキュメントをフロントエンド向けの形に正規化する。
   * - CMS 管理層
     - ``payload.config.ts``、``src/payload``
     - コレクションを定義し、管理画面を提供する。
   * - 認証とコメント
     - ``src/server/auth``、``src/server/comments``
     - OAuth、セッション、コメント保存、コメント権限を扱う。
   * - データ層
     - ``src/server/db``、``src/migrations``
     - Drizzle schema、データベース接続、アプリケーション移行を管理する。

記事読み込みフロー
------------------

1. ``/posts/[slug]`` ページが記事 slug を受け取る。
2. Server Component が ``getPostBySlug`` を呼び出す。
3. ``src/lib/payload-posts.ts`` が Payload client を取得し、``published`` の記事を問い合わせる。
4. 生の Payload ドキュメントを ``BlogPost`` に変換する。
5. ページがリッチテキストを表示し、共有やコメントの操作を有効にする。

データ境界
----------

Payload は編集コンテンツとメディアメタデータを所有します。アプリケーション層は認証、コメント、ルート動作、UI 状態、統合ロジックを所有します。新機能では、編集データは Payload collection に、アカウント・操作・モデレーション・運用記録は Drizzle schema に置く方針です。

既知のリスク
------------

* 本番環境では Payload secret のデフォルト値を使わない。
* RSS の正規パスは ``/rss.xml`` に統一する。
* タグ集計と検索インデックスは現在バッチ読み込みに依存しているため、規模が大きくなったらキャッシュまたは DB 側集計を導入する。
* コメントのロール方針には、より明確なサーバー側ルールとテストが必要。
