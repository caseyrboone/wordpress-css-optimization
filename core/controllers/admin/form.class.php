<?php
namespace O10n;

/**
 * Admin Form Controller
 *
 * @package    optimization
 * @subpackage optimization/controllers/admin
 * @author     Optimization.Team <info@optimization.team>
 */
if (!defined('ABSPATH')) {
    exit;
}

class AdminForm extends Controller implements Controller_Interface
{
    private $schemas; // JSON schemas
    private $user; // logged in user
    private $validator; // JSON validator

    private $schema_option_cache = array();

    /**
     * Load controller
     *
     * @param  Core       $Core Core controller instance.
     * @return Controller Controller instance.
     */
    public static function &load(Core $Core)
    {
        // instantiate controller
        return parent::construct($Core, array(
            'json',
            'options',
            'AdminView',
            'AdminForminput',
            'admin'
        ));
    }

    /**
     * Setup controller
     */
    protected function setup()
    {
        add_action('admin_post_o10n_update', array( $this, 'save_settings'));
    }

    /**
     * Return JSON schemas
     */
    final public function schemas()
    {
        if (empty($this->schemas)) {
            // load JSON schemas
            $this->schemas = array();

            $files = new \FilesystemIterator(O10N_CORE_PATH . 'schemas/', \FilesystemIterator::SKIP_DOTS);
            foreach ($files as $fileinfo) {

                // filename
                $filename = $fileinfo->getFilename();

                // check file extension
                if (!$fileinfo->isFile() || substr($filename, -5) !== '.json' || $filename === 'defaults.json') {
                    continue 1;
                }

                // schema json
                try {
                    $schemajson = $this->json->parse(file_get_contents($fileinfo->getPathname()));
                } catch (\Exception $err) {
                    // invalid JSON
                    continue 1;
                }

                $this->schemas[$filename] = $schemajson;
            }
        }

        return $this->schemas;
    }

    /**
     * Print line array
     */
    final public function line_array($path)
    {
        $option = $this->options->get($path);
        if (isset($option) && is_array($option)) {
            print join("\n", array_unique(array_filter(array_map('trim', $option))));
        }
    }

    /**
     * Return option
     */
    final public function get($path, $default = null)
    {
        if ($this->options->exists($path)) {
            return $this->options->get($path);
        }
        if (!is_null($default)) {
            return $default;
        }
    }
    
    /**
     * Print JSON
     */
    final public function json($path, $default = null)
    {
        $option = $this->get($path, $default);
        if (isset($option)) {
            return json_encode($option);
        }
    }

    /**
     * Print checked states for form element
     */
    final public function is_checked($path)
    {
        if (!$this->options->exists($path)) {
            $path .= '.enabled';
        }

        return $this->options->bool($path);
    }

    /**
     * Print checked states for form element
     */
    final public function checked($path)
    {
        if ($this->is_checked($path)) {
            print ' checked="checked"';
        }
    }

    /**
     * Print selected states for form element
     */
    final public function selected($path, $value)
    {
        $option = $this->options->get($path);
        if (isset($option) && $option === $value) {
            print ' selected';
        }
    }

    /**
     * Print value
     */
    final public function value($path, $default = false)
    {
        $option = $this->options->get($path);
        if (isset($option)) {
            if (!is_string($option)) {
                $value = json_encode($option);
            } else {
                $value = (string) $option;
            }
            print esc_attr($value);
        } elseif ($default) {
            print esc_attr($default);
        }
    }

    /**
     * Print visibility for subconfig
     */
    final public function visible($paths, $conditions = null)
    {
        if (!is_array($paths)) {
            $paths = array($paths);
        }

        $match = false;
        foreach ($paths as $path) {
            if ($this->is_checked($path)) {
                $match = true;
                break;
            }
        }
        if (!$match) {
            print ' style="display:none;"';
        } elseif (!is_null($conditions)) {
            
            // conditions
            if (!is_array($conditions)) {
                $conditions = array($conditions);
            }
            $match = true;
            foreach ($conditions as $condition) {
                if ($condition !== true) {
                    $match = false;
                }
            }
            if (!$match) {
                print ' style="display:none;"';
            }
        }
    }

    /**
     * Print visibility for subconfig
     */
    final public function invisible($paths, $conditions = null)
    {
        if (!is_array($paths)) {
            $paths = array($paths);
        }

        $match = false;
        foreach ($paths as $path) {
            if ($this->is_checked($path)) {
                $match = true;
                break;
            }
        }
        if ($match) {
            print ' style="display:none;"';
        } elseif (!is_null($conditions)) {
            
            // conditions
            if (!is_array($conditions)) {
                $conditions = array($conditions);
            }
            $match = true;
            foreach ($conditions as $condition) {
                if ($condition !== true) {
                    $match = false;
                }
            }
            if ($match) {
                print ' style="display:none;"';
            }
        }
    }

    /**
     * Return string from newline array
     */
    public function newline_array_string($array)
    {
        if (!is_array($array) || empty($array)) {
            return '';
        }

        return htmlentities(implode("\n", $array), ENT_COMPAT, 'utf-8');
    }

    /**
     * Get schema options
     *
     * @param  string $path JSON path in dot notation.
     * @return array  JSON schema configuration for path.
     */
    final public function schema_option($path)
    {

        // return from cache
        if (isset($this->schema_option_cache[$path])) {
            return $this->schema_option_cache[$path];
        }

        // start with master
        $result = $this->schemas['master.json'];

        $pathparts = explode('.', $path);
        $part = array_shift($pathparts);
        while ($part) {

            // properties.key
            if (isset($result->properties) && isset($result->properties->{$part})) {
                $result = $result->properties->{$part};
            } elseif (isset($result->{$part})) { // .key
                $result = $result->{$part};
            } elseif (isset($result->oneOf)) { // oneOf.key
                foreach ($result->oneOf as $obj) {
                    
                    // .key
                    if (isset($obj->{$part})) {
                        $result = $obj->{$part};
                        break;
                    }

                    // properties.key
                    if (isset($obj->properties) && isset($obj->properties->{$part})) {
                        $result = $obj->properties->{$part};
                        break;
                    }
                }
            } else { // not found
                $this->schema_option_cache[$path] = false;

                return false;
            }

            // reference, load sub-schema
            if (isset($result->{'$ref'}) && substr($result->{'$ref'}, 0, 1) !== '/') {
                $result = $this->schemas[explode('#', $result->{'$ref'})[0]];
            }

            // next part in path
            $part = array_shift($pathparts);
        }

        $this->schema_option_cache[$path] = $result;

        return $result;
    }

    /**
     * Get advanced options from schema
     *
     * @param string $schema_path JSON schema path of advanced options
     */
    final public function get_advanced_options($schema_path, $json = false)
    {
        $options = array();

        $config_options = $this->schema_option($schema_path);

        if (is_object($config_options) && isset($config_options->properties)) {
            $config_options = json_decode(json_encode($config_options->properties), true);
        } else {
            $config_options = json_decode(json_encode($config_options), true);
        }

        // verify data
        if (!is_array($config_options)) {
            throw new Exception('Failed to get option ' . $schema_path . ' from schema', 'admin');
        }

        // boolean on main param
        if (isset($config_options['oneOf'])) {
            $config_options = $config_options['oneOf'][1];
            if (isset($config_options['properties'])) {
                $config_options = $config_options['properties'];
            }
        }

        foreach ($config_options as $key => $option) {

            // subconfig
            $suboptions = array();

            // default value
            $option['default'] = (isset($option['default'])) ? $option['default'] : null;

            if (!is_null($option['default'])) {
                if (is_bool($option['default'])) {
                    $option['default_checked'] = $option['default'];
                } else {
                    $option['default_checked'] = true;
                }
            } else {
                $option['default_checked'] = false;
            }
            $option['default_value'] = $option['default_checked'];
 
            // option with sub option
            if (isset($option['oneOf'])) {

                // verify json schema
                if (sizeof($option['oneOf']) !== 2) {
                    throw new Exception('Invalid schema configuration for ' . $schema_path . '.' . $key, 'admin');
                }
                $suboption = (array)$option['oneOf'][1];

                // referenced JSON schema link
                if (isset($suboption['$ref'])) {
                    $refSchema = $this->schemas[explode('#', $suboption['$ref'])[0]];
                    if (!$refSchema) {
                        throw new Exception('Failed to load JSON schema reference ' . esc_html($suboption['$ref']), 'settings');
                    }
                    if (is_object($refSchema) && isset($refSchema->properties)) {
                        $refSchema = json_decode(json_encode($refSchema->properties), true);
                        $refSchema['type'] = 'object';
                    } else {
                        $refSchema = json_decode(json_encode($refSchema), true);
                    }

                    $suboption = array_merge($refSchema, $suboption);
                }

                // default value
                if (isset($suboption['default'])) {
                    $option['default_value'] = $suboption['default'];
                }

                // json key
                $option['json_key'] = $schema_path . '.' . $key;

                // option value
                $option_value = $this->get($option['json_key']);
                if (is_null($option_value) || !isset($option_value)) {
                    $option['checked'] = $option['default_checked'];
                } else {
                    $option['checked'] = ($option_value) ? true : false;
                }
            
                // set value
                $suboption['value'] = $option_value;
    
                $option['suboption'] = $suboption;
            } else {

                // JSON key
                $option['json_key'] = $schema_path . '.' . $key;

                $option_value = $this->get($option['json_key']);
                if (is_null($option_value) || !isset($option_value)) {
                    $option['checked'] = $option['default_checked'];
                } else {
                    // checkbox state
                    $option['checked'] = ($option_value === true) ? true : false;
                }
            }

            // set option
            $config_options[$key] = $option;
        }

        return $config_options;
    }

    /**
     * Print advanced options from schema
     *
     * @param string $schema_path JSON schema path of advanced options
     */
    final public function advanced_options($schema_path, $json = false, $nodefault = false)
    {
        // get options
        $config_options = $this->get_advanced_options($schema_path, $json);

        foreach ($config_options as $key => $option) {
            $icons = '';
            /*$default_value = $optcnf[0];
            $desc = $optcnf[1];

            $icons = '';
            switch ($key) {
                case "minifyCSS":
                case "minifyJS":
                case "minifyURLs":
                    $icons .= '<img src="' . O10N_CORE_URI . 'admin/images/cpu.png" width="16" alt="CPU intensive" title="CPU intensive - This option demands more from the Optimization API server." />';
                break;
            }

            if (isset($htmlmin_options[$key])) {
                $selected = ($htmlmin_options[$key]) ? true : false;
            } else {
                $selected = ($default_value === true) ? true : false;
            }*/

            // start advanced option row
            $default_attr = ''; //(!$nodefault) ? 'data-json-default="' . esc_attr(json_encode($option['default_checked'])) . '"' : '';
            print '<tr><td class="check"><input type="checkbox" class="on-switch" name="o10n[' . $option['json_key'] . ']" data-option="' . $option['json_key'] . '" data-option-default-checked="' . esc_attr(json_encode($option['default_checked'])) . '" data-option-default-value="' . esc_attr(json_encode($option['default_value'])) . '" value="1"' . ((isset($option['suboption'])) ? ' data-suboption="true"' : '') . ' ' . (($option['checked']) ? 'checked="checked"' : '') . ' /></td>';

            // print label
            print '<td class="label">' . (($icons) ? '<div class="icons">'.$icons.'</div>' : '') . '<label for="cb-' . $option['json_key'] . '"><pre>' . $key . '</pre></label></td>';

            // print description
            print '<td class="desc">' . ((isset($option['title'])) ? $option['title'] : '');

            if (isset($option['suboption'])) {

                // print option container
                print '<div class="opt" rel="' . $option['json_key'] . '"' . ((!$option['checked']) ? ' style="display:none;"' : '') . '><div class="opt-inner">';

                // custom configuration
                switch ($option['suboption']['type']) {

                    // JSON input
                    case "array":
                    case "object":

                        // description
                        if (isset($option['suboption']['title'])) {
                            print '<p class="d">'.$option['suboption']['title'].'</p>';
                        }

                        // JSON editor
                        print '<div class="json" data-json-type="json' . (($option['suboption']['type'] === 'array') ? '-array' : '') . '" ' . ((isset($option['suboption']['placeholder'])) ? ' placeholder="'.esc_attr($option['suboption']['placeholder']).'"' : '') . '><div class="loading-json-editor">' . __('Loading JSON editor...', 'o10n') . '</div></div>';

                    break;

                    // string value
                    case "string":

                        // description
                        if (isset($option['suboption']['title'])) {
                            print '<p class="d">'.$option['suboption']['title'].'</p>';
                        }

                        // select menu
                        if (isset($option['suboption']['enum'])) {

                            // single option
                            if (sizeof($option['suboption']['enum']) === 1) {

                                // checkbox
                                print '<label><input type="checkbox" value="' . esc_attr($option['suboption']['enum'][0]) . '" data-suboption="' . $option['json_key'] . '"' . (($this->is_checked($option['json_key'])) ? ' checked' : '') .' /> ' . esc_html($option['suboption']['title']) . '</label>';
                            } else {
                                print '<select data-suboption="' . $option['json_key'] . '">';

                                // print options
                                foreach ($option['suboption']['enum'] as $option_key) {
                                    $selected = ($option_key === $option['suboption']['value']) ? true : false;
                                    print '<option value="'.esc_html($option_key).'"'.(($selected) ? ' selected' : '').'>'.esc_html($option_key).'</option>';
                                }

                                print '</select>';
                            }
                        } else {
                            
                            // text input
                            print '<input type="text" data-suboption="' . $option['json_key'] . '" ' .
                                ((isset($option['suboption']['size'])) ? ' size="'.esc_html($option['suboption']['size']).'"' : '') .
                                ((isset($option['suboption']['minLength'])) ? ' minlength="'.esc_html($option['suboption']['minLength']).'"' : '')  .
                                ((isset($option['suboption']['maxLength'])) ? ' maxlength="'.esc_html($option['suboption']['maxLength']).'"' : '') .
                                ((isset($option['suboption']['placeholder'])) ? ' placeholder="'.esc_html($option['suboption']['placeholder']).'"' : '') .
                                ' value="' . (string)$option['suboption']['value'] . '"' . ' />';
                        }

                    break;

                    // integer
                    case "number":

                        // description
                        if (isset($option['suboption']['title'])) {
                            print '<p class="d">'.$option['suboption']['title'].'</p>';
                        }

                        // number input
                        print '<input type="number" data-suboption="' . $option['json_key'] . '" ' .
                            ((isset($option['suboption']['size'])) ? ' size="'.esc_html($option['suboption']['size']).'"' : '') .
                            ((isset($option['suboption']['minimum'])) ? ' min="'.esc_html($option['suboption']['minimum']).'"' : '')  .
                            ((isset($option['suboption']['maximum'])) ? ' max="'.esc_html($option['suboption']['maximum']).'"' : '') .
                            ((isset($option['suboption']['placeholder'])) ? ' placeholder="'.esc_html($option['suboption']['placeholder']).'"' : '') .
                            ' value="' . (string)$option['suboption']['value'] . '"' . ' />';

                    break;

                    // boolean
                    case "boolean":

                        // checkbox
                        print '<label><input type="checkbox" value="' . esc_attr($option['suboption']['key']) . '" data-suboption="' . $option['json_key'] . '"' . (($this->is_checked($option['json_key'] . '.' . $option['suboption']['key'])) ? ' checked' : '') .' /> ' . esc_html($option['suboption']['title']) . '</label>';

                    break;
                    default:
                        throw new Exception('Advanced option type not valid: ' . esc_html($option['suboption']['type']), 'settings');
                    break;
                }

                // close option container
                print '</div></div>';
            }

            // close advanced option row
            print '</td></tr>';
        }
    }

    /**
     * Process form submission
     */
    final public function save_settings()
    {

        // check security parameter
        if (!check_admin_referer('save_settings') || !$this->user = wp_get_current_user()) {
            throw new Exception('Not authorized.', 'settings');
        }

        // redirect to form
        $redirect_url = (isset($_POST['_wp_http_referer'])) ? $_POST['_wp_http_referer'] : add_query_arg(array( 'page' => 'o10n-' . $this->AdminView->active() ), admin_url('admin.php'));

        // replace timestamp
        if (preg_match('#([\?|\&])(t=[\d]+)#is', $redirect_url, $out)) {
            $redirect_url = str_replace($out[1].$out[2], $out[1] . 't=' . time(), $redirect_url);
        } else {
            $amp = (strpos($redirect_url, '?') !== false) ? '&' : '?';
            $redirect_url .= $amp . 't=' . time();
        }

        // verify input
        try {
            $verified = $this->AdminForminput->verify();
        } catch (Exception $err) {
            $verified = false;
        } catch (\Exception $err) {
            $verified = false;
            $this->AdminForminput->error('', $err->getMessage());
        }

        // save verified/valid settings
        $this->AdminForminput->save();

        // input has errors
        if (!$verified || $this->AdminForminput->errors() !== false) {
            $notice = 'Failed to save settings. The input contains the following errors.';
            $errors = $this->AdminForminput->errors();
            if (!empty($errors)) {
                $notice .= '<ol>';
                foreach ($errors as $path => $error) {
                    if (is_string($error)) {
                        $notice .= '<li><strong>'.$path.'</strong> '.$error.'</li>';
                    } else {
                        $notice .= '<li><strong>'.$error['property'].'</strong> '.$error['message'].'</li>';
                    }
                }
                $notice .= '</ol>';
            }

            // add error notice
            $this->admin->add_notice($notice, 'settings');
            
            // return to form
            wp_redirect($redirect_url);
            exit;
        }

        // add error notice
        $this->admin->add_notice('Settings saved.', 'settings', 'SUCCESS');

        // return to form
        wp_redirect($redirect_url);
    }
}
