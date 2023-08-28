<?php

use Kirby\Cms\App;

App::plugin('diverently/writer-block', [
    'options' => [
        'inline' => false,
        'marks' => false,
        'nodes' => true,
    ],
    'blueprints' => [
        'blocks/writer' => __DIR__ . '/blueprint.yml',
    ],
    'snippets' => [
        'blocks/writer' => __DIR__ . '/snippet.php',
    ],
    'api' => [
        'routes' => [
            [
                'pattern' => 'writer-block',
                'action'  => function () {
                    // Get options for Vue component
                    return [
                        'inline' => kirby()->option('diverently.writer-block.inline'),
                        'marks' => kirby()->option('diverently.writer-block.marks'),
                        'nodes' => kirby()->option('diverently.writer-block.nodes'),
                    ];
                }
            ]
        ]
    ],
]);
